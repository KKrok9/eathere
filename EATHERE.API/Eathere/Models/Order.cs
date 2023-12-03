using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Eathere.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public Guid OrderAccepterId { get; set; }

        public Guid TableId { get; set; }
        [ForeignKey("TableId")]
        public virtual Table? Table { get; set; }
        public Guid RestaurantId { get; set; }
        [ForeignKey("RestaurantId")]
        public virtual Restaurant? Restaurant { get; set; }
        public string OrderStatus { get; set; }
        public string Description { get; set; }
        [NotMapped]
        public List<Guid> DishIds { get; set; }

        [Column("DishIds")]
        public string DishIdsAsString
        {
            get => DishIds != null ? string.Join(",", DishIds.Select(id => id.ToString().ToUpper())) : null;
            set => DishIds = value?.Split(',').Select(Guid.Parse).ToList();
        }
    }
}
