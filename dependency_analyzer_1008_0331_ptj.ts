// 代码生成时间: 2025-10-08 03:31:26
import { Injectable } from '@angular/core';
import { NgModule, Component } from '@angular/core';
import { ReflectorReader } from '@angular/core/src/reflection/reflector_reader';

@Injectable({
  providedIn: 'root'
})
export class DependencyAnalyzerService {

  private reflector: ReflectorReader;

  constructor(private reflector: ReflectorReader) {
    this.reflector = reflector;
  }

  /**
   * Analyze the dependency tree of a given module.
   *
   * @param module The Angular module to analyze.
   * @returns The dependency tree as a nested object.
   */
  analyzeModuleDependencies(module: any): any {
    if (!module || !module.decorators || !module.decorators.length) {
      throw new Error("Invalid module provided");
    }
    const metadata = module.decorators[0].args[0];
    const imports = metadata.imports || [];
    const dependencies = imports.map((imp: any) => this.analyzeModuleDependencies(imp));

    return {
      name: metadata.type.name,
      dependencies
    };
  }

  /**
   * Analyze the dependency tree of a given component.
   *
   * @param component The Angular component to analyze.
   * @returns The dependency tree as a nested object.
   */
  analyzeComponentDependencies(component: any): any {
    if (!component || !component.decorators || !component.decorators.length) {
      throw new Error("Invalid component provided");
    }
    const metadata = component.decorators[0].args[0];
    const imports = metadata.imports || [];
    const dependencies = imports.map((imp: any) => this.analyzeComponentDependencies(imp));

    return {
      name: metadata.selector,
      dependencies
    };
  }
}

/**
 * Example component to demonstrate usage of DependencyAnalyzerService.
 */
@Component({
  selector: 'app-example-component',
  template: `<div>Example Component</div>`
})
export class ExampleComponent {
  constructor(private dependencyAnalyzer: DependencyAnalyzerService) {
    try {
      const dependencies = dependencyAnalyzer.analyzeComponentDependencies(this.constructor);
      console.log("Component Dependencies:", dependencies);
    } catch (error) {
      console.error("Error analyzing component dependencies:", error);
    }
  }
}

/**
 * Example module to demonstrate usage of DependencyAnalyzerService.
 */
@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    // Other modules
  ],
  exports: [
    ExampleComponent
  ]
})
export class ExampleModule {
  constructor(private dependencyAnalyzer: DependencyAnalyzerService) {
    try {
      const dependencies = dependencyAnalyzer.analyzeModuleDependencies(this.constructor);
      console.log("Module Dependencies:", dependencies);
    } catch (error) {
      console.error("Error analyzing module dependencies:", error);
    }
  }
}