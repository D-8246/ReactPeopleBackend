using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;   
        }

        public List<Person> GetAll()
        {
            var ctx = new PeopleDataContext(_connectionString);
            return ctx.People.ToList();
        }

        public void Add(Person person)
        {
            var ctx = new PeopleDataContext(_connectionString);
            ctx.People.Add(person);
            ctx.SaveChanges();
        }

        public void DeleteAll(List<int> ids)
        {
            var ctx = new PeopleDataContext(_connectionString);
            var peopleToDelete = ctx.People.Where(p => ids.Contains(p.Id));
            ctx.People.RemoveRange(peopleToDelete);
            ctx.SaveChanges();
        }

        public void Update(Person person)
        {
            var ctx = new PeopleDataContext(_connectionString);
            var p = ctx.People.FirstOrDefault(p => p.Id == person.Id);
            if(person != null)
            {
                p.FirstName = person.FirstName;
                p.LastName = person.LastName;
                p.Age = person.Age;
            }
            ctx.SaveChanges();
        }

    }
}
