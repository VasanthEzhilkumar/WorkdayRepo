// utils.ts
import { faker } from '@faker-js/faker';

/**
 * Generates a random first and last name.
 * @returns {Object} - Random first and last name.
 */
export function generateRandomName(): { givenName: string, familyName: string } {
    const givenName = faker.person.firstName();
    const familyName = faker.person.lastName();

    return {
        givenName,
        familyName
    };
}
