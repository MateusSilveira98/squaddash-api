
exports.seed = function (knex, Promise) {

  return knex('skills').del()
    .then(function () {
      return knex('skills').insert([
        { id: 1, name: 'Java' },
        { id: 2, name: 'C#' },
        { id: 3, name: 'Ruby' },
        { id: 4, name: 'Node.Js' },
        { id: 5, name: 'PHP' },
        { id: 6, name: 'Python' },
        { id: 7, name: 'SOA' },
        { id: 8, name: 'API' },
        { id: 9, name: 'Database' },
        { id: 10, name: 'UX' },
        { id: 11, name: 'UI' },
        { id: 12, name: 'Research' },
        { id: 13, name: 'React' },
        { id: 14, name: 'Angular' },
        { id: 15, name: 'Vue' },
        { id: 16, name: 'Sass' }
      ]);
    });
};
