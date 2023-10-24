using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); //Pozwala na dostep do http context
//builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); // pobranie connection stringa z appsettingsow
});
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
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer(); //obsluga api exploreer
builder.Services.AddSwaggerGen(); // dokumentacja api w oparciu o atrybuty i komentarze w kodzie

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