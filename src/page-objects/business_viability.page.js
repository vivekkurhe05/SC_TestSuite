'use strict'

const elementBy = require('../helpers/element_by')
const wait = require('../helpers/waits')
const dropDown = require('../helpers/drop_down')

var BusinessViabilityPage = function(){

    this.title = elementBy.populate_element_by_css("h4.page-title");
    this.addNewButton = elementBy.populate_element_by_xpath("//a[contains(text(),'Add new')]");
    this.editBVA = elementBy.populate_element_by_xpath("(//a[contains(text(), 'Edit')])[3]");
    this.nameTextBox = elementBy.populate_element_by_name("s0s0e0");
    this.addressTextBox1 = elementBy.populate_element_by_name("s0s0e1c0");
    this.addressTextBox2 = elementBy.populate_element_by_name("s0s0e1c1");
    this.landmarkTextBox = elementBy.populate_element_by_name("s0s0e1c3");
    this.bvnTextBox = elementBy.populate_element_by_name("s0s0e2");
    this.selectCountry = elementBy.populate_element_by_xpath("(//div[@class='multiselect__tags'])[1]");
    this.pickCountry = elementBy.populate_element_by_xpath("(//div[@class='multiselect__content-wrapper']/ul/li/span/span/span)");
    this.saveAndContinueBtn = elementBy.populate_element_by_xpathAll("//button[contains(text(),'Save and Continue')]");
    this.selectOption = elementBy.populate_element_by_desiredOption("//select[@name='s0s1e0']", "option")

    //when yes
    this.associationNameTextbox = elementBy.populate_element_by_name("s0s1e0r0c0ps");
    this.associationAddressTextbox = elementBy.populate_element_by_name("s0s1e0r0c1ps");

    //when no
    this.businessClusterDropdown = elementBy.populate_element_by_desiredOption("//select[@name='s0s1e0ps']", "option");

    this.verifyBusinessViablityPageHeading = async () => {
        return await this.title.getText();
    }

    this.clickEditButton = () => this.editBVA.click();

    this.enterText = (elem, details) => {
        wait.waitForPresenceOfElement(elem);
        elem.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
        elem.sendKeys(protractor.Key.BACK_SPACE);
        elem.sendKeys(details);
    }

    /**
     * 
     * 
     * 
     *  This returns ElementArrayFinder of buttons ad click particulr specified index
     */
    this.clickSaveAndContinueBtn = (elem, index) => {
        elem.then(async function(items){
            if(await items[index].getText() === "Save and Continue"){
                items[index].click();
            }
        });
    }

    this.SelectAndGoAhead = async () => {
        dropDown.selectRandomOption(this.selectOption);
        if(await this.selectOption.getText() === 'No'){
            dropDown.selectRandomOption(this.businessClusterDropdown);
        }else if(this.selectOption.getText() === 'Yes'){
            wait.waitForElementVisibility(this.associationNameTextbox);
            this.associationNameTextbox.sendKeys('value1');
            this.associationAddressTextbox.sendKeys('value2');
        }
    }

};

module.exports = new BusinessViabilityPage();