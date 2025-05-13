using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CalculatorController : ControllerBase
{
    [HttpGet("calculate")]
    public IActionResult Calculate(string operation, double num1, double num2)
    {
        double result = operation.ToLower() switch
        {
            "add" => num1 + num2,
            "subtract" => num1 - num2,
            "multiply" => num1 * num2,
            "divide" => num2 != 0 ? num1 / num2 : double.NaN,
            "mod" => num1 % num2,
            _ => double.NaN
        };

        return Ok(new { Result = result });
    }
}
