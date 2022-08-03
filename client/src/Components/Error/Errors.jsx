export function validation(input){

    let errors = {};

    if (!input.title || input.title.length > 40){
        errors.title = 'A title is required, (max 40 char)'
    }
    if (!input.summary){
        errors.summary = 'A Summary is required'
    }
    if(!input.healthScore || input.healthScore < 0 || input.healthScore > 100){
        errors.healthScore = 'A Score from 0 to a 100 is required';
    }
    if(!input.steps[0]){
        errors.steps = 'A Step is required';
    }
    if(!input.image){
        errors.image = 'A Image is required'
    }
    if(!input.diets.length){
        errors.diets = 'A Diet must be chosen';
    }
    return errors;
}