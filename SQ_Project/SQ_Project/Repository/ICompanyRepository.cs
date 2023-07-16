using SQ_Project.Model;

namespace SQ_Project.Repository
{
    public interface ICompanyRepository
    {
        Company GetById(int id);
        IEnumerable<Company> GetAll();
        void Add(Company company);
        void Update(Company company);
        void Delete(int id);
    }
}
