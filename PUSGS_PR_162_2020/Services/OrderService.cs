using AutoMapper;
using EntityFramework.Exceptions.Common;
using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;
using PUSGS_PR_162_2020.Enums;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        public OrderService(IMapper mapper, IOrderRepository orderRepository) { 
            _mapper = mapper;
            _orderRepository = orderRepository;
        }
        public DeleteResponseDTO CancelOrder(long id, long userId)
        {
            Order? order = _orderRepository.GetOrderById(id);

            if (order == null)
            {
                throw new Exception("Order with specified id doesn't exist!");
            }

            if (order.BuyerId != userId)
            {
                throw new Exception("Buyers can only cancel their own orders!");
            }

            if ((DateTime.UtcNow - order.CreatedAt).Hours > 1)
            {
                throw new Exception("Orders can only be cancelled in the first hour!");
            }

            Article? article = _orderRepository.GetArticle(order.ArticleId);

            if (article == null)
            {
                throw new Exception("Article with specified id doesn't exist!");
            }

            article.Quantity += order.Quantity;

            //Maybe put this in try/catch
            _orderRepository.RemoveOrder(order);
            _orderRepository.Save();

            return _mapper.Map<DeleteResponseDTO>(order);
        }

        public OrderResponseDTO CreateOrder(OrderRequestDTO requestDto, long userId)
        {
            Order order = _mapper.Map<Order>(requestDto);
            order.BuyerId = userId;

            Article? article = _orderRepository.GetArticle(order.Id);

            if (article == null)
            {
                throw new Exception("Article with specified id doesn't exist!");
            }

            if (article.Quantity < order.Quantity)
            {
                throw new Exception("There are not enough articles in stock!");
            }

            article.Quantity -= order.Quantity;
            order.OrderStatus = Status.PENDING;
            order.Price = article.Price * order.Quantity;
            order.CreatedAt = DateTime.UtcNow;
            order.DeliveryTime = new Random().Next(1, 25);

            

            try
            {
                _orderRepository.AddOrder(order);
                _orderRepository.Save();
            }
            catch (CannotInsertNullException)
            {
                throw new Exception("One of more fields are missing!");
            }
            catch (Exception)
            {
                throw;
            }

            return _mapper.Map<OrderResponseDTO>(order);
        }

        public List<OrderResponseDTO> GetAllOrders(OrderHelper orderHelper)
        {
            List<Order> orders = new List<Order>();

            if(orderHelper.BuyerId > 0)
            {
                _orderRepository.GetAllOrdersBuyer(orderHelper);
            } else if (orderHelper.SellerId > 0)
            {
                //repo
                _orderRepository.GetOrderBySellerId(orderHelper.SellerId);
            } else
            {
                //get orders from list
                orders = _orderRepository.GetAllOrders();
            }

            return _mapper.Map<List<OrderResponseDTO>>(orders);

        }

        public OrderResponseDTO GetOrderById(long id)
        {
            OrderResponseDTO order = _mapper.Map<OrderResponseDTO>(GetOrderById(id));

            if (order == null)
            {
                throw new Exception("Order with given id doesn't exist");
            }

            return order;
        }
    }
}
