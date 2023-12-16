using AutoMapper;
using Eathere.DTOs;
using Eathere.Models;

namespace Eathere.Profiles
{
    public class WorkerProfile : Profile
    {
        public WorkerProfile() {
            CreateMap<User, WorkerDto>();
            CreateMap<WorkerDto, User>();
        }
    }
}
