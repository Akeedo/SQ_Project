using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SQ_Project.Config;
using SQ_Project.Model;

namespace SQ_Project.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ApplicationDbContext _context;

        public CompanyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Company GetById(int id)
        {
            return _context.Companies.FirstOrDefault(c => c.Id == id);
        }

        public IEnumerable<Company> GetAll()
        {
            return _context.Companies.ToList();
        }

        public void Add(Company company)
        {
            _context.Companies.Add(company);
            _context.SaveChanges();
        }

        public void Update(Company company)
        {
            _context.Companies.Update(company);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var company = _context.Companies.FirstOrDefault(c => c.Id == id);
            if (company != null)
            {
                _context.Companies.Remove(company);
                _context.SaveChanges();
            }
        }
    }
}