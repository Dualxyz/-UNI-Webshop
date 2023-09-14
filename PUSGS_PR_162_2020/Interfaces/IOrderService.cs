using Microsoft.AspNetCore.WebUtilities;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.DTO.OrderDTO.OrderHelper;

namespace PUSGS_PR_162_2020.Interfaces
{
    public interface IOrderService
    {
        List<OrderResponseDTO> GetAllOrders(OrderHelper orderHelper);
        OrderResponseDTO GetOrderById(long id);
        OrderResponseDTO CreateOrder(OrderRequestDTO requestDto, long userId);
        DeleteResponseDTO CancelOrder(long id, long userId);
    }
}
