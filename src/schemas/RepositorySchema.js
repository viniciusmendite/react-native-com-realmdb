export default class RepositorySchema {
  static schema = {
    name: 'Repository', // nome do schema
    primaryKey: 'id', // informa a chave primária
    properties: {
      // recebe todos os campos do schema
      id: {type: 'int', indexed: true},
      name: 'string',
      fullName: 'string',
      description: 'string',
      stars: 'int',
      forks: 'int',
    },
  };
}
