﻿namespace Eathere.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public Guid RestaurantId { get; set; }
        public string RoleInRestaurant { get; set; }
        public DateTime BirthdayDate { get; set; }
        public DateTime? RegisterDate { get; set; }
        public double? Salary { get; set; }
    }
}