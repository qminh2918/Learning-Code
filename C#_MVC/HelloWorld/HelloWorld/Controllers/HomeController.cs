using HelloWorld.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HelloWorld.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var massage = new MessageModel();
            massage.Welcome = "asp.net mvc with ViewBag"; 
            return View(massage);
        }
    }
}