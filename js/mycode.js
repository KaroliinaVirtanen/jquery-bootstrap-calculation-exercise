/*
 * Your name: Karoliina Virtanen
 * Start date:
 * End date:
 * 
 */

$(document).ready(function () {
    /**
     * Generates a random number in a min - max range
     * 
     * @param {Number} min  minimum value for a random number
     * @param {Number} max  maximum value for a random number
     * @returns {Number}    generated random number
     */
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Calculates the around of circle or square
     * 
     * @param {Number} value    radius or side measurement
     * @param {Number} type     1 = circle, 2 = square
     * @returns {String}        result of a calculation
     */
    function calculateAround(value, type) {
        let result = "";
        if (type === 1) {
            let around = 2 * Math.PI * value;
            result = "Circle around: " + around.toFixed(1);
        } else {
            let around = value * 4;
            result = "Square around: " + around.toFixed(1);
        }
        return result;
    }

    // dice images, use indexes 1 - 6
    let dice = [
        '',
        '<span><img src="img/noppa1.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/noppa2.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/noppa3.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/noppa4.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/noppa5.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/noppa6.png" class="img-fluid" alt=""/></span>'
    ];


    // red and blue flower
    let pair = [
        '<span><img src="img/flower1.png" class="img-fluid" alt=""/></span>',
        '<span><img src="img/flower2.png" class="img-fluid" alt=""/></span>'
    ];

    // Exercise 1. Circle or Square

    $("#calculate").click(function () {
        let shape = Number($("input[name=rad_cir_opt]:checked").val()); // read the shape of the element (if 1=circle, if 2=square)
        let submitted = Number($("#radius_side").val()); // read the given radius/side, written in by a person

        //calculate the answer
        if (shape === 1) {
            let c_around = calculateAround(submitted, 1);
            $("#result").html(c_around);
        } else if (shape === 2) {
            let s_around = submitted * 4;
            $("#result").html("Square around: " + s_around);
        }

        $("[name=rad_cir_opt]").focusin(function () {
            $("#result").html("");
            $("#radius_side").select();
        });
    });

    // Exercise 2. Circle and Square 

    $(".rad_cir").click(function () {

        // activate the input element visible 
        if ($("#chk1").prop("checked") === true) {
            $("#radius2").removeClass("invisible");
            $("#radius2").select();
        } else {
            $("#radius2").addClass("invisible");
            $("#radius2").val("");
            $("#circle2").html("");
        }

        if ($("#chk2").prop("checked") === true) {
            $("#side2").removeClass("invisible");
            $("#side2").select();
        } else {
            $("#side2").addClass("invisible");
            $("#side2").val("");
            $("#square2").html("");
        }
    });

    $("#calculate2").click(function () {
        let submitted_c = Number($("#radius2").val());
        let submitted_s = Number($("#side2").val());

        let checkbox = $(".rad_cir");
        $(checkbox).each(function () {
            if ($(this).prop("checked") === true) {
                let shape = Number($(this).val());
                if (shape === 1) {
                    let c_around = calculateAround(submitted_c, 1);
                    $("#circle2").html(c_around);
                } else if (shape === 2) {
                    let s_around = submitted_s * 4;
                    $("#square2").html("Square around: " + s_around);
                }
            }
        });

    });

    $("#chk1").focusin(function () {
        $("#circle2").html("");
        $("#side2").select();
    });

    $("#chk2").focusin(function () {
        $("#square2").html("");
        $("#radius2").select();
    });

    // Exercise 3. Random numbers 1    

    $("#numbers").click(function () {

        if ($("#small").prop("checked") == true) {
            let luckynumber = getRndInteger(1, 10);
            $("#rnd_numbers").html(luckynumber);
        }

        if ($("#middle").prop("checked") == true) {
            let luckynumber = getRndInteger(1, 20);
            $("#rnd_numbers").html(luckynumber);
        }

        if ($("#large").prop("checked") == true) {
            let luckynumber = getRndInteger(1, 50);
            $("#rnd_numbers").html(luckynumber);
        }
    });

    // count the amount of clicks
    let counts = 1;

    $("#numbers").click(function () {
        $("#total").html(counts++);

        // clear the prints and focus
        $("[name=num_scale]").focusin(function () {
            $("#rnd_numbers").html("");
            $("#total").html("");
            counts = 1;

        });
    });

    // Exercise 4. Random numbers 2   

    $("#random").click(function () {

        // read the values given by a person
        let min = Number($("#min").val());
        let max = Number($("#max").val());

        //calculation
        let numbers = new Array();
        for (let i = 0; i < 10; i++) {
            numbers.push(getRndInteger(min, max));
            $("#randoms").html(numbers.join(' '));
        }

        // empty the fields
        $("#min").focusin(function () {
            $("#randoms").html("");
            $("#min").select();
        });

        $("#max").focusin(function () {
            $("#randoms").html("");
            $("#max").select();
        });
    });

    // Exercise 5. Throw dices    
    $("#throw").click(function () {

        let pairs = [0, 0, 0, 0, 0, 0, 0];
        let summa = 0;
        $("#dices").html("");
        $("#pairs").html("");

        dice1 = getRndInteger(1, 6);
        dice2 = getRndInteger(1, 6);

        // create loop until 100 times dices are thrown
        for (let i = 0; i < 100; i++) {
            dice1 = getRndInteger(1, 6);
            dice2 = getRndInteger(1, 6);
            if (dice1 === dice2) {
                pairs[dice1]++;
                // kutospari, parillinen, ei pari ollenkaan.
                if (dice1 === 6) {
                    // element "pair" is photos of dices
                    $("#dices").append("<li>" + dice[dice1] + dice[dice2] + pair[1] + "</li>");
                } else {
                    $("#dices").append("<li>" + dice[dice1] + dice[dice2] + pair[0] + "</li>");
                }
            } else {
                $("#dices").append("<li>" + dice[dice1] + dice[dice2] + "</li>");
            }
        }

        // printtaa + "<span / </span>" + badge

        $("#dices").html();

        for (let i = 1; i < pairs.length; i++) {
            summa += pairs[i];
            $("#pairs").append(i + ":" + pairs[i] + " ");
        }
        $("#count").append("All:" + summa);
    });
});
