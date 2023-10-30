using System;

namespace Eathere.Models
{
    public class OrderDish
    {
        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }

        public Guid DishId { get; set; }
        public virtual Dish Dish { get; set; }
    }
}
