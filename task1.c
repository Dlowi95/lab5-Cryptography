#include <stdio.h>
#include <openssl/bn.h>

void printBN(char *msg, BIGNUM * a)
{
    char * number_str = BN_bn2hex(a);
    printf("%s %s\n", msg, number_str);
    OPENSSL_free(number_str);
}

int main ()
{
    BN_CTX *ctx = BN_CTX_new();

    BIGNUM *p = BN_new();
    BIGNUM *q = BN_new();
    BIGNUM *e = BN_new();
    BIGNUM *phi = BN_new();
    BIGNUM *d = BN_new();

    BIGNUM *p1 = BN_new();
    BIGNUM *q1 = BN_new();

    BN_hex2bn(&p, "F7E75FDC469067FFDC4E847C51F452DF");
    BN_hex2bn(&q, "E85CED54AF57E53E092113E62F436F4F");
    BN_hex2bn(&e, "0D88C3");

    BN_sub(p1, p, BN_value_one());
    BN_sub(q1, q, BN_value_one());

    BN_mul(phi, p1, q1, ctx);

    BN_mod_inverse(d, e, phi, ctx);

    printBN("Private key d =", d);

    return 0;
}
