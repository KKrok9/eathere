using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eathere.Models
{
    public class Dish
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Ingredients { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public double? Calories { get; set; }
        public double? Proteins { get; set; }
        public double? Fats { get; set; }
        public double? Carbohydrates { get; set; }
        public Guid? PortionTypeId { get; set; }
        [ForeignKey("PortionTypeId")]
        public virtual PortionType? PortionType { get; set; }
        public Guid? DishTypeId { get; set; }
        [ForeignKey("DishTypeId")]
        public virtual DishType? DishType { get; set; }
        public Guid RestaurantId { get; set; }
        [ForeignKey("RestaurantId")]
        public virtual Restaurant? Restaurant { get; set; }

    }
}
