using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eathere.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid OrderAccepterId { get; set; }
        public Guid TableId { get; set; }
        public string OrderStatus { get; set; }
        public virtual List<Dish> Dishes { get; set; } = new List<Dish>();
    }
}
