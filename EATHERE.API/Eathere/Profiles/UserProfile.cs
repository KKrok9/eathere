using AutoMapper;
using Eathere.DTOs;
using Eathere.Models;

namespace Eathere.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile() {
            CreateMap<User, UserDto>();
        }
    }
}
