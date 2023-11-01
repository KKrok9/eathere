using Eathere.Services;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddCustomServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped(typeof(ISqlRepository<>), typeof(SqlRepository<>));
            services.AddTransient<IAuthService, AuthService>();
        }
    }
}
