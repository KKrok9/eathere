﻿using Eathere.Models;
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
            var restaurants = await _repository.GetAllAsync();
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

            StringBuilder codeBuilder = new StringBuilder(codeLength);

            for (int i = 0; i < codeLength; i++)
            {
                int index = random.Next(allowedChars.Length);
                char randomChar = allowedChars[index];
                codeBuilder.Append(randomChar);
            }

            return codeBuilder.ToString();
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
    }
}