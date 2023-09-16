using AutoMapper;
using PUSGS_PR_162_2020.DTO.AricleDTO;
using PUSGS_PR_162_2020.DTO.OrderDTO;
using PUSGS_PR_162_2020.DTO.RegisterDTO;
using PUSGS_PR_162_2020.DTO.UserInfoDTO;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        { 
            CreateMap<UserRequestDTO, User>().ReverseMap();
            CreateMap<User, UserResponseDTO>().ReverseMap();
            CreateMap<RegisterRequestDTO, User>().ReverseMap();
            CreateMap<User, VerificationResponseDTO>().ReverseMap();

            CreateMap<Article, ArticleResponseDTO>();
            CreateMap<Article, ArticleDeleteReponseDTO>();
            CreateMap<ArticleRequestDTO, Article>();

            CreateMap<Order, OrderResponseDTO>();
            CreateMap<Order, OrderRequestDTO>();
            CreateMap<OrderRequestDTO, Order>();
            CreateMap<Order, DeleteResponseDTO>();
            CreateMap<OrderRequestDTO, Order>();

        }
    }
}
