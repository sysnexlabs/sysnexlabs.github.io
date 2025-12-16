/**
 * Test data with valid SysML v2 code examples
 */

export const VALID_SYSML_CODE = {
  simple: `package 'Simple Example' {
    doc /* A simple package */
    
    part def SimplePart {
        attribute name :> ScalarValues::String;
    }
}`,

  vehicle: `package 'Vehicle System' {
    doc /*
     * A simple vehicle system example demonstrating
     * SysML v2 structural modeling.
     */
    
    part def Vehicle {
        attribute speed :> ScalarValues::Real;
        attribute mass :> ScalarValues::Real = 1000.0;
        
        part engine : Engine;
        part wheels : Wheel[4];
    }
    
    part def Engine {
        attribute power :> ScalarValues::Real = 150.0;
    }
    
    part def Wheel {
        attribute diameter :> ScalarValues::Real = 0.5;
    }
}`,

  requirements: `package 'Requirements Example' {
    requirement def 'Vehicle Safety' {
        doc /*
         * The vehicle must meet all safety standards
         */
    }
    
    requirement def 'Performance' {
        doc /*
         * The vehicle must achieve 0-60 mph in under 6 seconds
         */
    }
}`,

  interfaces: `package 'Interface Example' {
    interface def PowerInterface {
        end powerIn : PowerInterface;
        end powerOut : PowerInterface;
    }
    
    part def Battery {
        port output : PowerInterface;
    }
}`,

  complex: `package 'Complex System' {
    doc /*
     * A complex system with multiple parts, attributes, and relationships
     */
    
    part def System {
        attribute id :> ScalarValues::String;
        attribute version :> ScalarValues::String = "1.0.0";
        
        part subsystem1 : Subsystem;
        part subsystem2 : Subsystem[2];
    }
    
    part def Subsystem {
        attribute name :> ScalarValues::String;
        attribute enabled :> ScalarValues::Boolean = true;
        
        part component : Component;
    }
    
    part def Component {
        attribute type :> ScalarValues::String;
    }
}`,
}

export const INVALID_SYSML_CODE = {
  unquotedPackage: `package UnquotedPackage {
    part def Test {}
}`,

  missingType: `package 'Test' {
    part def Test {
        attribute name;
    }
}`,

  syntaxError: `package 'Test' {
    part def Test {
        attribute name :> 
    }
}`,
}

export const EXPECTED_DIAGNOSTICS = {
  unquotedPackage: [
    {
      line: 1,
      message: expect.stringContaining('Package name must be quoted'),
      severity: 'error'
    }
  ],
  missingType: [
    {
      line: 3,
      message: expect.stringContaining('Attribute must have a type'),
      severity: 'error'
    }
  ],
}

export const EXPECTED_DOCUMENTATION = {
  vehicle: {
    chapters: [
      {
        title: 'Vehicle System',
        kind: '[Package]',
        subchapters: [
          {
            title: 'Vehicle',
            kind: '[PartDefinition]',
            nested_elements: expect.arrayContaining([
              expect.objectContaining({
                title: 'speed',
                kind: '[AttributeUsage]',
              }),
              expect.objectContaining({
                title: 'mass',
                kind: '[AttributeUsage]',
              }),
            ])
          }
        ]
      }
    ]
  }
}
