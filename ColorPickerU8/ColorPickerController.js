/*
 * U8 Color Picker 
 * by Christopher Muya
 * 
 */
angular.module("umbraco").controller("U8Muya.ColorPickerController",
    function spectrumColorPicker($scope, assetsService, angularHelper, $element) {
        // Check that rgb is selected if transparency is enabled.
        $scope.model.config.enableTransparency = convertToBoolean($scope.model.config.enableTransparency);
        if ($scope.model.config.enableTransparency) {
            $scope.model.config.preferredFormat = "rgb";
        }
        assetsService.loadJs(
            "~/App_Plugins/ColorPickerU8/lib/spectrum/spectrum.js"
        ).then(function () {
            var predefinedColor = [];
            for (i = 0; i < $scope.model.config.predefinedColor.length; i++) {
                predefinedColor.push($scope.model.config.predefinedColor[i].value);
            }      
            $element.find("input").spectrum({
                color: $scope.model.value,
                cancelText: $scope.cancelText,
                chooseText: $scope.chooseText,
                togglePaletteMoreText: $scope.moreText,
                togglePaletteLessText: $scope.lessText,
                clearText: $scope.clearText,
                noColorSelectedText: $scope.selectedText,
                preferredFormat: $scope.model.config.preferredFormat,
                showAlpha: $scope.model.config.enableTransparency, // Cannot be null.
                showInitial: true,
                showInput: true,
                showPalette: true,
                allowEmpty: true,
                palette: predefinedColor,
                change: function (color) {
                    angularHelper.safeApply($scope, function () {
                        //Update model
                        $scope.model.value = color != null ? color.toString() : color;
                    });
                }
            });
        });
        //Umbraco returns null if the checkbox is not checked. 
        // Returns 1 if it is.
        function convertToBoolean(input) {
            switch (input) {
                case true: case "1": case "True": case "true": case 1: return true;
                default: return false;
            }
        }
    }
);
