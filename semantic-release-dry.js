module.exports = async ({ require }) => {
  const semanticRelease = require('semantic-release');
  const result = await semanticRelease(
    {
      ci: false,
      dryRun: true,
    },
    {
      env: { ...process.env, GITHUB_ACTIONS: '' },
    }
  );
  if (result) {
    return result.nextRelease.notes;
  }
  return 'No release';
};
