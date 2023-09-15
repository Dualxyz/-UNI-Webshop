using Microsoft.EntityFrameworkCore.Diagnostics;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Interfaces.RepoInterfaces
{
    public interface IOrderRepository
    {
        List<Order> GetAllOrders();
        public List<Order> GetAllOrdersBuyer(OrderHelper helper);
        public List<Order> GetOrderBySellerId(long id);
        public Order? GetOrderById(long id);
        public void Save();
        public bool AddOrder(Order order);
        public Article? GetArticle(long id);
        public Order? RemoveOrder(Order order);

    }
}
