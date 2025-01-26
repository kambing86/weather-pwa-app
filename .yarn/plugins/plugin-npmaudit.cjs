// from https://github.com/yarnpkg/berry/issues/2507#issuecomment-785439280

module.exports = {
  name: `plugin-npmaudit`,
  factory: (require) => {
    const { Command } = require(`clipanion`);
    const { Configuration, Project, httpUtils, structUtils } = require(`@yarnpkg/core`);

    class NpmAuditCommand extends Command {
      static paths = [[`npmaudit`]];
      async execute() {
        const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
        const { project, workspace } = await Project.find(configuration, this.context.cwd);

        if (!workspace) {
          throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
        }

        await project.restoreInstallState();

        const request = {};
        let dependenciesCount = 0;
        const putResolution = (name, version) => {
          const versions = request[name] ?? [];
          if (versions.length === 0) {
            request[name] = versions;
          }
          versions.push(version);
          dependenciesCount++;
        };

        for (const pkg of project.storedPackages.values()) {
          const { reference, version } = pkg;
          if (reference.startsWith('npm:')) {
            putResolution(structUtils.stringifyIdent(pkg), version);
          }
        }

        const vulnerableDependencies = await httpUtils.post(
          'https://registry.npmjs.org/-/npm/v1/security/advisories/bulk',
          request,
          {
            configuration,
            jsonResponse: true
          });

        const vulnerableDependenciesCount = Object.keys(vulnerableDependencies).length;
        const report = {
          vulnerableDependencies,
          vulnerableDependenciesCount,
          dependenciesCount,
        };

        this.context.stdout.write(JSON.stringify(report, undefined, 2));

        return vulnerableDependenciesCount === 0 ? 0 : 1;
      }
    }

    return {
      commands: [
        NpmAuditCommand,
      ],
    };
  }
};
