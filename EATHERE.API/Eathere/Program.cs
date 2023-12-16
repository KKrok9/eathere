using Eathere.SqlRepository;
using Microsoft.EntityFrameworkCore;
using Eathere.Services.Interfaces;
using Eathere.Services;
using Eathere.Data;
using Eathere.Profiles;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); //Pozwala na dostep do http context
//builder.Services.AddCustomServices(builder.Configuration);
//--REGISTERING SERVICES---
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); // pobranie connection stringa z appsettingsow

});
builder.Services.AddScoped(typeof(ISqlRepository<>), typeof(SqlRepository<>));
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IRestaurantService, RestaurantService>();
builder.Services.AddTransient<IDishService,DishService>();
builder.Services.AddTransient<ITableService, TableService>();
builder.Services.AddTransient<IOrderService,OrderService>();
builder.Services.AddTransient<IWorkerService,WorkerService>();
builder.Services.AddTransient<IPortionTypeService,PortionTypeService>();
builder.Services.AddTransient<IDishTypeService, DishTypeService>();
builder.Services.AddCors(options => // pozwala na dostep do zasobow z innych domen
//cors to cross origin resources sharing
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
builder.Services.AddControllers(); // dodaje kontrolery 
builder.Services.AddEndpointsApiExplorer(); //obsluga api exploreer
builder.Services.AddSwaggerGen(); // dokumentacja api w oparciu o atrybuty i komentarze w kodzie
builder.Services.AddAutoMapper(typeof(WorkerProfile));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Configure the HTTP request pipeline.
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();//przekierowanie https (jelsi wysylamy na http to przekierowuje na https

app.UseAuthentication();
app.UseAuthorization();
app.UseCors();

app.MapControllers();

app.Run();