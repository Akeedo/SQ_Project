using SQ_Project.Model;

namespace SQ_Project.Repository
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetDepartments();
        Task<Department> GetDepartment(int id);
        Task<Department> AddDepartment(Department department);
        Task<Department> UpdateDepartment(Department department);
        Task<Department> DeleteDepartment(int id);
    }
}
