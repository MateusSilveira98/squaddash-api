
exports.seed = function (knex, Promise) {

  return knex('skills').del()
    .then(function () {
      return knex('skills').insert([
        { id: 1, skill: 'Java' },
        { id: 2, skill: 'C#' },
        { id: 3, skill: 'Ruby' },
        { id: 4, skill: 'Node.Js' },
        { id: 5, skill: 'PHP' },
        { id: 6, skill: 'Python' },
        { id: 7, skill: 'SOA' },
        { id: 8, skill: 'API' },
        { id: 9, skill: 'Database' },
        { id: 10, skill: 'UX' },
        { id: 11, skill: 'UI' },
        { id: 12, skill: 'Research' },
        { id: 13, skill: 'React' },
        { id: 14, skill: 'Angular' },
        { id: 15, skill: 'Vue' },
        { id: 16, skill: 'Sass' }
      ]);
    });
};
