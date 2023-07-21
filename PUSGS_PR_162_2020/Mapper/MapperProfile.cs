using AutoMapper;
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
        }
    }
}
