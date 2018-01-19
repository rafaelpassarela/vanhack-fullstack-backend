using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetReact
{
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    [DisableCors]
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        //[EnableCors("AllowSpecificOrigin")]
        public IEnumerable<string> Get()
        {
            var list = new List<string>();
            var rnd = new Random();

            var max = rnd.Next(1, 100);
            for (int i = 0; i < max; i++)
            {
                list.Add(rnd.Next(1, 100).ToString());
            }

            return list;
            //return new string[] { "value1", "value2", "values3" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
