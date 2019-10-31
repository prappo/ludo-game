function validate() {
    var newText = "";

    jQuery.ajax({
        url: baseUrl + "rest/playerExists",
        type: "POST",
        data: JSON.stringify({"playerName": $("#playerName").val()}),

        contentType: 'application/json; charset=utf-8',
        success: function (resultData) {
            if (!resultData.success) $("#nicknameError").text(resultData.message);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });

    if ($("#playerName").val().length > 16) newText = "Name max length is 16 charaters.";
    if ($("#playerName").val().length < 3) newText = "Name must be at least 3 charaters.";

    $("#nicknameError").text(newText);

    $("#createNickname").attr("disabled", (newText != ""));
}

function submit() {
    jQuery.ajax({
        url: baseUrl + "rest/regPlayer",
        type: "POST",
        data: JSON.stringify({"playerName": $("#playerName").val()}),

        contentType: 'application/json; charset=utf-8',
        success: function (resultData) {
            if (resultData.success) {
                localStorage.token = resultData.token;
                localStorage.playerId = resultData.playerId;
                window.location.href = "lobby";
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        },

        timeout: 120000,
    });
}

function validateToken(next) {
    jQuery.ajax({
        url: baseUrl + "rest/login/?token=" + localStorage.token,
        type: "GET",

        contentType: 'application/json; charset=utf-8',
        success: function (resultData) {
            next(resultData.valid);
        },
        timeout: 120000,
    });
}

$(document).ready(function () {
    $("#playerName").on("change keyup", function (event) {
        validate();
        if (event.keyCode === 13) {
            submit();
        }
    });

    $("#createNickname").click(function () {
        submit();
    });



    validateToken(function (valid) {
        if (valid) window.location.href = baseUrl + "lobby";
    });
});