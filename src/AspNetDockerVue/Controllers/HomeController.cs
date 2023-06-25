using Microsoft.AspNetCore.Mvc;

namespace AspNetDockerVue.Controllers
{
	[Route("api/[controller]/[action]")]
	[ApiController]
	public class HomeController : ControllerBase
	{
		public IActionResult Index() =>
			Ok(new { message = "Mensagem da controller" });
	}
}
