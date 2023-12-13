using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Text;

namespace Eathere.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly ISqlRepository<Restaurant> _repository;
        private static readonly Random random = new Random();
        private readonly IUserService _userService;

        public RestaurantService(ISqlRepository<Restaurant> repository, IUserService userService) {
            _repository = repository;
            _userService = userService;
        }
        public async Task<Restaurant?> AddRestaurant(Restaurant restaurant) // ONLY ACCOUNTS WITH ISRESTAURANTOWNER=TRUE CAN ADD RESTAURANT
        {
            string restaurantCode = await CreateRestaurantCode();
            restaurant.RestaurantCode = restaurantCode; 
            await _repository.AddAsync(restaurant);
            var restaurants = await _repository.GetAllAsync(); // CAN CHANGE IT WITH FUNCTION 
            var currentlyLoggedUser = await _userService.GetCurrentlyLoggedUser();
            var thisRestaurant = restaurants.FirstOrDefault(x => x.OwnerId == currentlyLoggedUser.Id);
            currentlyLoggedUser.RestaurantId = thisRestaurant.Id;
            await _userService.UpdateUserAsync(currentlyLoggedUser);
            return restaurant;
        }

        public async Task<string> CreateRestaurantCode()
        {
            const string allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const int codeLength = 5;
            var restaurants = await _repository.GetAllAsync();
            while (true)
            {

                StringBuilder codeBuilder = new StringBuilder(codeLength);

                for (int i = 0; i < codeLength; i++)
                {
                    int index = random.Next(allowedChars.Length);
                    char randomChar = allowedChars[index];
                    codeBuilder.Append(randomChar);
                }
                string generatedCode = codeBuilder.ToString();
                bool isCodeUnique = await IsRestaurantCodeUnique(generatedCode, restaurants);
                if (isCodeUnique)
                {
                    return generatedCode;
                }
            }
        }


        private async Task<bool> IsRestaurantCodeUnique(string code, IEnumerable<Restaurant> restaurants)
        {
            var existingRestaurant = restaurants.FirstOrDefault(r => r.RestaurantCode == code);
            return existingRestaurant == null;
        }


        public async Task<IEnumerable<Restaurant>> GetAllRestaurants()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Restaurant> GetRestaurantByOwnerId(Guid id)
        {
            var restaurants = await _repository.GetAllAsync();
            var myRestaurant = restaurants.FirstOrDefault(x=> x.OwnerId == id);
            return myRestaurant;
        }


        public async Task UpdateRestaurant(Restaurant restaurant)
        {
            await _repository.UpdateAsync(restaurant);
        }

        public async Task<Restaurant> GetRestaurantOfCurrentlyLoggedUser()
        {
            var currentlyLoggedUser = await _userService.GetCurrentlyLoggedUser();
            var restaurants = await _repository.GetAllAsync();
            var thisRestaurant = restaurants.FirstOrDefault(x => x.Id == currentlyLoggedUser.RestaurantId);
            return thisRestaurant;
        }

        public async Task RegisterUserByRestaurantCode(string restaurantCode)
        {
            var restaurants = await GetAllRestaurants();
            var myRestaurant = restaurants.FirstOrDefault(x => x.RestaurantCode == restaurantCode);
            if (myRestaurant == null)
            {
                throw new Exception("Restaurant code isnt correct!");
            }
            var currentUser = await _userService.GetCurrentlyLoggedUser();
            currentUser.RestaurantId = myRestaurant.Id;
            await _userService.UpdateUserAsync(currentUser);

        }
    }
}
