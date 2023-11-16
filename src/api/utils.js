export function validarData(data, propiedadesRequeridas) {
    if (typeof data !== 'object' || data === null) {
      throw new Error('formato de datos incorrecto.');
    }
  
    const propiedadesFaltantes = propiedadesRequeridas.filter(prop => !(prop in data));
  
    if (propiedadesFaltantes.length > 0) {
      throw new Error(`propiedades faltantes `);
    }
  
    const valoresVacios = propiedadesRequeridas.filter(prop => data[prop].trim() === '');
  
    if (valoresVacios.length > 0) {
      throw new Error(`valores vacíos en data `);
    }
  
    console.log('La validación fue exitosa.');
  }
  