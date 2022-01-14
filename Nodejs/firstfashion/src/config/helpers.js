const Handlebars = require('handlebars');
module.exports = function(req, res, next) {
    Handlebars.registerHelper('select', function(selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    });

    Handlebars.registerHelper("counter", function (index){
        return index + 1;
    });
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
    Handlebars.registerHelper('date', require('helper-date'));
    Handlebars.registerHelper('checked', function(value, test) {
        if (value == undefined) return '';
        return value==test ? 'checked' : '';
    });
    Handlebars.registerHelper('toInt', function(str) {
        return parseInt(str,10);
      });
    Handlebars.registerHelper('numberFormat', function (value, options) {
        // Helper parameters
        var dl = options.hash['decimalLength'] || 0;
        var ts = options.hash['thousandsSep'] || ',';
        var ds = options.hash['decimalSep'] || '.';
    
        // Parse to float
        var value = parseFloat(value);
    
        // The regex
        var re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';
    
        // Formats the number with the decimals
        var num = value.toFixed(Math.max(0, ~~dl));
    
        // Returns the formatted number
        return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts);
    });
    next()
}