﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eathere.Models
{
    public class Restaurant
    {
        [Key] // ID WILL BE PK 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] //id will be auto generated BY DB
        public Guid Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string StreetNumber { get; set; }
        public string RestaurantName { get; set; }
        public Guid OwnerId { get; set; } // it doesn't have to be unique cause some owners can own multiple restaurants
        [MaxLength(5)]
        public string RestaurantCode { get; set; }

    }
}