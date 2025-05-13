using System;
using Microsoft.Data.SqlClient;

class Program
{
    static void Main(string[] args)
    {
        string connectionString = "Data Source=LTIN516669;Integrated Security=True;Trust Server Certificate=True";

        Console.WriteLine("Welcome to the Calculator!");

        while (true)
        {
            Console.WriteLine("\nEnter the first number:");
            if (!double.TryParse(Console.ReadLine(), out double num1))
            {
                Console.WriteLine("Invalid input. Please enter a valid number.");
                continue;
            }

            Console.WriteLine("Enter the operation (+, -, *, /, %):");
            string operation = Console.ReadLine();

            Console.WriteLine("Enter the second number:");
            if (!double.TryParse(Console.ReadLine(), out double num2))
            {
                Console.WriteLine("Invalid input. Please enter a valid number.");
                continue;
            }

            double result = 0;
            bool validOperation = true;

            switch (operation)
            {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 == 0)
                    {
                        Console.WriteLine("Division by zero is not allowed.");
                        validOperation = false;
                    }
                    else
                    {
                        result = num1 / num2;
                    }
                    break;
                case "%":
                    result = num1 % num2;
                    break;
                default:
                    Console.WriteLine("Invalid operation. Please enter one of +, -, *, /, %.");
                    validOperation = false;
                    break;
            }

            if (validOperation)
            {
                Console.WriteLine($"Result: {result}");
                LogCalculation(connectionString, num1, operation, num2, result);
            }

            Console.WriteLine("\nDo you want to perform another calculation? (yes/no):");
            string continueResponse = Console.ReadLine();
            if (continueResponse?.ToLower() != "yes")
            {
                break;
            }
        }
    }

    static void LogCalculation(string connectionString, double num1, string operation, double num2, double result)
    {
        string query = "INSERT INTO CalculationLogs (Operand1, Operation, Operand2, Result, Timestamp) VALUES (@Operand1, @Operation, @Operand2, @Result, @Timestamp)";

        try
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Operand1", num1);
                    command.Parameters.AddWithValue("@Operation", operation);
                    command.Parameters.AddWithValue("@Operand2", num2);
                    command.Parameters.AddWithValue("@Result", result);
                    command.Parameters.AddWithValue("@Timestamp", DateTime.Now);

                    command.ExecuteNonQuery();
                    Console.WriteLine("Calculation logged successfully.");
                }
            }
        }
        catch (SqlException ex)
        {
            Console.WriteLine($"SQL Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
