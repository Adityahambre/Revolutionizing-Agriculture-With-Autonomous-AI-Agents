
"""Create OTP challenges table."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "fe1532339fc1"
down_revision: Union[str, Sequence[str], None] = "4b204cf974f9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "otp_challenges",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("phone", sa.String(20), nullable=False),
        sa.Column("full_name", sa.String(100), nullable=True),
        sa.Column("purpose", sa.String(10), nullable=False),
        sa.Column("otp_hash", sa.String(64), nullable=False),
        sa.Column("attempts", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("consumed_at", sa.DateTime(timezone=True), nullable=True),
    )

    op.create_index(
        "ix_otp_challenges_id",
        "otp_challenges",
        ["id"],
        unique=False,
    )

    op.create_index(
        "ix_otp_challenges_phone",
        "otp_challenges",
        ["phone"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_otp_challenges_phone", table_name="otp_challenges")
    op.drop_index("ix_otp_challenges_id", table_name="otp_challenges")
    op.drop_table("otp_challenges")
