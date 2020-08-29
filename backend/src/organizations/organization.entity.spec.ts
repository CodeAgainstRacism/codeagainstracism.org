import { Organization } from './organization.entity';

describe('Organization entity', () => {
  it('should make an organization with no fields', () => {
    const organization = new Organization();
    expect(organization).toBeTruthy();
    expect(organization.id).toBe(undefined);
    expect(organization.EIN).toBe(undefined);
    expect(organization.name).toBe(undefined);
    expect(organization.description).toBe(undefined);
    expect(organization.phoneNumber).toBe(undefined);
    expect(organization.email).toBe(undefined);
    expect(organization.contactFirstName).toBe(undefined);
    expect(organization.contactLastName).toBe(undefined);
  });

  it('should make an organization with some fields', () => {
    const organization = new Organization(
      0,
      '1234',
      'orgname',
      undefined,
      '514-123-4567',
    );
    expect(organization).toBeTruthy();
    expect(organization.id).toBe(0);
    expect(organization.EIN).toBe('1234');
    expect(organization.name).toBe('orgname');
    expect(organization.description).toBe(undefined);
    expect(organization.phoneNumber).toBe('514-123-4567');
    expect(organization.email).toBe(undefined);
    expect(organization.contactFirstName).toBe(undefined);
    expect(organization.contactLastName).toBe(undefined);
  });

  it('should make an organization with all fields', () => {
    const organization = new Organization(
      0,
      '1234',
      '',
      'org description',
      '514-123-4567',
      'email@email.com',
      'first name',
      'last name',
    );
    expect(organization).toBeTruthy();
    expect(organization.id).toBe(0);
    expect(organization.EIN).toBe('1234');
    expect(organization.name).toBe('');
    expect(organization.description).toBe('org description');
    expect(organization.phoneNumber).toBe('514-123-4567');
    expect(organization.email).toBe('email@email.com');
    expect(organization.contactFirstName).toBe('first name');
    expect(organization.contactLastName).toBe('last name');
  });
});
