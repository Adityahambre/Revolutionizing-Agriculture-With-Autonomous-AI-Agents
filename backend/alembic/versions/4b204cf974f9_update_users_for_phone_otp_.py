
"""Update users for phone OTP authentication."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "4b204cf974f9"
down_revision: Union[str, Sequence[str], None] = "4a4580a75c42"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Remove old email and password authentication fields.
    op.drop_index("ix_users_email", table_name="users")
    op.drop_constraint("users_phone_key", "users", type_="unique")

    op.drop_column("users", "email")
    op.drop_column("users", "hashed_password")

    # Make phone mandatory and uniquely indexed.
    op.alter_column(
        "users",
        "phone",
        existing_type=sa.String(length=20),
        nullable=False,
    )
    op.create_index("ix_users_phone", "users", ["phone"], unique=True)

    # Set account status and creation date defaults.
    op.alter_column(
        "users",
        "is_active",
        existing_type=sa.Boolean(),
        nullable=False,
        server_default=sa.text("true"),
    )

    op.alter_column(
        "users",
        "created_at",
        existing_type=sa.DateTime(timezone=True),
        nullable=False,
    )


def downgrade() -> None:
    # Restore the old columns as nullable because their original
    # values cannot be recovered after being dropped.
    op.drop_index("ix_users_phone", table_name="users")

    op.add_column(
        "users",
        sa.Column("email", sa.String(length=150), nullable=True),
    )
    op.add_column(
        "users",
        sa.Column("hashed_password", sa.String(length=255), nullable=True),
    )

    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.alter_column(
        "users",
        "phone",
        existing_type=sa.String(length=20),
        nullable=True,
    )
    op.create_unique_constraint("users_phone_key", "users", ["phone"])

    op.alter_column(
        "users",
        "is_active",
        existing_type=sa.Boolean(),
        nullable=True,
        server_default=None,
    )

    op.alter_column(
        "users",
        "created_at",
        existing_type=sa.DateTime(timezone=True),
        nullable=True,
    )
