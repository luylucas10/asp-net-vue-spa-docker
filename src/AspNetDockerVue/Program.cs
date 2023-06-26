namespace AspNetDockerVue
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			builder.Services.AddControllers();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			var app = builder.Build();

			if (app.Environment.IsEnvironment("DEBUG") || app.Environment.IsEnvironment("DEVELOPMENT"))
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseAuthorization();
			app.MapControllers();
			app.MapFallbackToFile("index.html");
			app.Run();
		}
	}
}