using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Interfaces.RepoInterfaces
{
    public interface IOrderRepository
    {
        List<Order> GetAllOrders();
        public List<Order> GetAllOrdersBuyer(OrderHelper helper);

    }
}
