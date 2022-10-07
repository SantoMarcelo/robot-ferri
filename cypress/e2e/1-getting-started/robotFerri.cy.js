/// <reference types="cypress" />

import dayjs from 'dayjs';
const fs = require("fs");
const { parse } = require("csv-parse");

describe('Pegando dados ferri', () => {
  beforeEach(() => {
    cy.visit('http://infosag.techouse.net.br:8025/SmartFerri/')
  })
  it('Gerando relatório comercial e salvando arquivo .csv', () => {
    let startDate = dayjs().startOf('month').format('YYYY-MM-DD');
    let endDate = dayjs().endOf('month').format('YYYY-MM-DD');
    cy.intercept('GET', '/SmartFerri/Home/Dashboard').as('getDashboard');
    cy.intercept('POST', 'SmartFerri/Home/AnaliseDeAtendimentos*').as('updateDash');
    cy.get('#DE_USUARIO').should('be.visible').type('Marcio Comercial');
    cy.get('#DE_SENHA').should('be.visible').type('1357');
    cy.contains('Entrar').click();
    cy.get('.sidebar-menu > :nth-child(2) > a').should('be.visible').click();
    cy.wait('@getDashboard');
    cy.get('#dtInicial').should('be.visible').type(startDate);
    cy.get('#dtFinal').should('be.visible').type(endDate);
    cy.get('[onclick^="AtualizarAtendimentos()"]').click();
    cy.wait('@updateDash');
    cy.get('[onclick^="ExportarCSV()"]').click();
  })
})
