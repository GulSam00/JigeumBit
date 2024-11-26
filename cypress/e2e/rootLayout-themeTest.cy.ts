describe('Dark Mode Toggle', () => {
  beforeEach(() => {
    localStorage.setItem('darkMode', 'false'); // 초기값을 라이트 모드로 설정
    cy.visit('/');
  });

  it('초기 테스트 - data-theme=light', () => {
    // 초기 상태에서 body의 data-theme 속성이 light여야 함
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });

  it('다크 모드 클릭 - light -> dark', () => {
    cy.get('button').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    // localStorage에 darkMode 값이 true로 저장되어야 함
    cy.window().then(win => {
      expect(win.localStorage.getItem('darkMode')).to.equal('true');
    });
  });

  it('다크 모드 2번 클릭 - light -> dark -> light', () => {
    cy.get('button').should('be.enabled').click();
    cy.get('button').should('be.enabled').click();
    cy.get('html').should('have.attr', 'data-theme', 'light');

    // localStorage에 darkMode 값이 false로 저장되어야 함
    cy.window().then(win => {
      expect(win.localStorage.getItem('darkMode')).to.equal('false');
    });
  });
});
