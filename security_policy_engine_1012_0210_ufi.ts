// 代码生成时间: 2025-10-12 02:10:32
class SecurityPolicyEngine {

  private rules: Map<string, (data: any) => boolean>;

  constructor() {
    this.rules = new Map<string, (data: any) => boolean>();
  }

  /**
   * Add a new security rule to the engine.
   *
   * @param {string} ruleId - A unique identifier for the rule.
   * @param {(data: any) => boolean} ruleFunc - The function implementing the rule.
   */
  public addRule(ruleId: string, ruleFunc: (data: any) => boolean): void {
    if (this.rules.has(ruleId)) {
      throw new Error(`Rule with ID '${ruleId}' already exists.`);
    }
    this.rules.set(ruleId, ruleFunc);
  }

  /**
   * Remove an existing security rule from the engine.
   *
   * @param {string} ruleId - The unique identifier for the rule to remove.
   */
  public removeRule(ruleId: string): void {
    if (!this.rules.has(ruleId)) {
      throw new Error(`Rule with ID '${ruleId}' does not exist.`);
    }
    this.rules.delete(ruleId);
  }

  /**
   * Evaluate data against all security rules.
   *
   * @param {any} data - The data to be evaluated.
   * @returns {boolean} - True if all rules pass, false otherwise.
   */
  public evaluate(data: any): boolean {
    for (const [ruleId, ruleFunc] of this.rules) {
      try {
        if (!ruleFunc(data)) {
          console.error(`Security rule '${ruleId}' failed for data:`, data);
          return false;
        }
      } catch (error) {
        console.error(`Error evaluating rule '${ruleId}':`, error);
        return false;
      }
    }
    return true;
  }
}

/**
 * Example usage of SecurityPolicyEngine.
 *
 * @description Demonstrates how to define and evaluate security rules.
 */
const securityEngine = new SecurityPolicyEngine();

// Define a simple rule that checks if a user is over 18.
securityEngine.addRule('adultCheck', (data) => {
  return data.age >= 18;
});

// Define another rule that checks if a user has a valid email.
securityEngine.addRule('emailCheck', (data) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(data.email);
});

// Evaluate a user against the rules.
const user = { name: 'John Doe', age: 20, email: 'john.doe@example.com' };
const isSecure = securityEngine.evaluate(user);
console.log(`User is secure: ${isSecure}`);