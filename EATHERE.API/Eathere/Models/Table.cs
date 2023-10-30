﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Eathere.Models
{
    public class Table
    {
        [Key] // ID WILL BE PK 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] //id will be auto generated BY DB
        public Guid Id { get; set; }
        public int TableNumber { get; set; }
        public int Capacity { get; set; }
        public bool IsTaken { get; set; }
    }
}
